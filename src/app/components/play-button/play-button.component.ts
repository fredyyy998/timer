import { Component, Input } from "@angular/core";
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {
  public faPlay = faPlay;
  public faPause = faPause;
  @Input() isPlaying: boolean = true;
}
