import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AulaService }  from '@aula_service/AulaService';
import { BreadcrumbNode } from '@models/file';

@Component({
  selector: 'app-bar-directory',
  templateUrl: './bar-directory.component.html'
})
export class BarDirectoryComponent implements OnInit {
  @Input('data') extras?: any;
  nodes$: Observable<BreadcrumbNode[]>;
  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AulaService
  ) { }

  ngOnInit(): void {
    this.nodes$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        this.id = params.get('id');
        return this.service.getFileParents(this.id);
      })
    );
  }
}
