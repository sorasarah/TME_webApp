import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        //responsive
        return [
          { title: 'Nombre de ventes', cols: 1, rows: 1 },
          { title: 'CA', cols: 1, rows: 1 },
          { title: 'Impots', cols: 1, rows: 1 },
          { title: 'Marge', cols: 1, rows: 1 }
        ];
      }
      //desktop
      return [
        { title: 'Nombre de ventes', cols: 2, rows: 1 },
        { title: 'CA', cols: 1, rows: 2 },
        { title: 'Impots', cols: 1, rows: 1 },
        { title: 'Marge', cols: 1, rows: 1 }
      ];
    })
  );
}