import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ToolsService } from 'src/app/services/tools.service';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.sass']
})
export class GenerateComponent implements OnInit {

  constructor(private appService: AppService, public treeService: TreeService, private toolsService: ToolsService) { }

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
      this.toolsService.showSnackBar('All the values must be at least equals to one', 'Ok');
    } else if(min_nested > max_nested) {
      error = true;
      this.toolsService.showSnackBar('Min nested nodes count must be less or equal to max count', 'Ok');
    }

    if(!error) {
      if(this.treeService.buildMockTree(...args)) {
        this.toolsService.showSnackBar('Tree was successfully generated', 'Ok');
        setTimeout(() => this.toolsService.redirect('display-tree'), 1000);
      } else {
        this.toolsService.showSnackBar('An error occured, try again', 'Ok');
      }
    }

  }

}
