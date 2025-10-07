import { Component, Input } from '@angular/core';
import { UserChatConfig } from '../../interfaces/ui-configs/user-chat-config.interface';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
    selector: 'app-user-chat-card',
    imports: [CommonModule, SharedModule],
    templateUrl: './user-chat-card.component.html',
    styleUrl: './user-chat-card.component.scss'
})
export class UserChatCardComponent {

  @Input() config!: UserChatConfig;
}
