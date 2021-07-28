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

  ngOnInit(): void { }

  // TODO: generate dynamically by treeService method
  generateTree() {
    this.treeService.treeData = [
      {
        name: 'Fruit',
        children: [
          {name: 'Apple'},
          {name: 'Banana'},
          {name: 'Fruit loops'},
        ]
      }, 
      {
        name: 'Vegetables',
        children: [
          {
            name: 'Green',
            children: [
              {name: 'Broccoli'},
              {name: 'Brussels sprouts'},
            ]
          }, {
            name: 'Orange',
            children: [
              {name: 'Pumpkins'},
              {name: 'Carrots'},
            ]
          },
        ]
      },
    ]

    this.appService.openSnackBar('Tree was successfully generated', 'Ok');
    this.appService.redirect('display-tree');

  }

}
