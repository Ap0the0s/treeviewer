import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.sass']
})
export class GenerateComponent implements OnInit {

  rootNodes: number = 0;
  childNodesMin: number = 0;
  childNodesMax: number = 0;
  maxNesting: number = 0;

  constructor(private appService: AppService, public treeService: TreeService) { }

  ngOnInit(): void { 
    this.treeService.showProgressBar = false;
  }

  generateTree(...args: number[]) {

    let error = false;
    const [root_count, min_nested, max_nested] = args;

    const checkMinValues = args.every(function (e) {
      return e >= 1;
    });

    if(!checkMinValues) {
      error = true;
      this.appService.openSnackBar('All the values must be at least equals to one', 'Ok');
    } else if(min_nested > max_nested) {
      error = true;
      this.appService.openSnackBar('Min nested nodes count must be less or equal to max count', 'Ok');
    }

    if(!error) {
      if(this.treeService.buildMockTree(...args)) {
        this.appService.openSnackBar('Tree was successfully generated', 'Ok');
        setTimeout(() => this.appService.redirect('display-tree'), 1000);
      } else {
        this.appService.openSnackBar('An error occured, try again', 'Ok');
      }
    }

  }

}
