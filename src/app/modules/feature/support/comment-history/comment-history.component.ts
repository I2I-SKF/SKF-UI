import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment-history',
  templateUrl: './comment-history.component.html',
  styleUrls: ['./comment-history.component.scss']
})
export class CommentHistoryComponent {
  @Input() comment_data:any = null;
  @Input() status_data:any = null;

  statuses:any = {};

  constructor(private active_modal:NgbActiveModal){

  }


  displayed_columns = [
    'Date',
    'Status',
    'Comments'
  ]

  table_data:any = [];

  ngOnInit(): void {
    console.log(this.comment_data,this.status_data);

    this.status_data.map((status:any)=>{
      this.statuses[status.id] = status.status;
    })

   
    
    if(this.comment_data){
      this.table_data = this.comment_data.map((record:any)=>{
        return  { 
          'Date':record.Timestamp,
          'Status':this.statuses[record.Status],
          'Comments':record.Comment
        }
      })
    }
    
  }

  closeModal() {
    this.active_modal.close();
  }
}
