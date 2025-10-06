import { Injectable, inject } from '@angular/core';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  updateProfile,
} from '@angular/fire/auth';

import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  USER = 'user';
  CURENT_USER = 'current_user';
  router: Router = inject(Router);

  constructor(private firestore: Firestore) {}

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async registerWithEmail(
    email: string,
    password: string,
    displayName?: string
  ): Promise<UserCredential> {
    const cred = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    if (displayName) {
      try {
        await updateProfile(cred.user, { displayName });
      } catch (e) {
        console.warn('updateProfile failed', e);
      }
    }

    this.addUserData(cred.user, displayName ? { name: displayName } : null);
    this.setCurrentUser(cred.user);

    return cred;
  }

  /** Sign in existing user with email & password */
  async signInWithEmail(
    email: string,
    password: string
  ): Promise<UserCredential> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    this.setCurrentUser(cred.user);
    return cred;
  }

  async getUserFromDb(userId: string) {
    const docRef = doc(this.firestore, this.USER, userId);
    const userDoc = await getDoc(docRef);
    return userDoc.data();
  }

  async getUserById() {
    const current = this.getCurrentUser();
    if (!current || !current.uid) return null;
    const docRef = doc(this.firestore, this.USER, current.uid);
    const userDoc = await getDoc(docRef);
    return userDoc.data();
  }

  addUserData(user: User, userData: { name: string } | null) {
    const collectionRef = collection(this.firestore, this.USER);

    const queryRef = query(collectionRef, where('userId', '==', user.uid));

    const allDocs = getDocs(queryRef).then(async (result) => {
      if (result.size == 0) {
        const docRef = doc(this.firestore, this.USER, user.uid);
        if (userData) {
          await setDoc(
            docRef,
            {
              fullName: userData !== null ? userData.name : '',
              userId: user.uid,
              profile: user.photoURL,
            },
            { merge: true }
          );
        } else {
          await setDoc(
            docRef,
            {
              fullName: user.displayName,
              userId: user.uid,
              profile: user.photoURL,
            },
            { merge: true }
          );
        }
      }
    });
  }

  getCurrentUser() {
    const raw = localStorage.getItem(this.CURENT_USER);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed;
    } catch (e) {
      return null;
    }
  }

  setCurrentUser(currentUser: User) {
    // Persist only a minimal, serializable user object to avoid storing
    // Firebase internal objects that may be frozen and later cause errors.
    const data = {
      uid: currentUser.uid,
      email: currentUser.email ?? null,
      displayName: currentUser.displayName ?? null,
      photoURL: currentUser.photoURL ?? null,
    };
    localStorage.setItem(this.CURENT_USER, JSON.stringify(data));
  }

  async logoutUser() {
    await signOut(this.auth);
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
