import { Component } from '@angular/core';

import { DonePage } from '../done/done';
import { PendingPage } from '../pending/pending';
import { InProcessPage } from '../in-process/in-process';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = PendingPage;
  tab2Root: any = InProcessPage;
  tab3Root: any = DonePage;

  constructor() {

  }
}
