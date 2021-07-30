import { Component, OnInit } from '@angular/core';
import { TreeService } from 'src/app/services/tree.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ListNode } from 'src/app/models/Models';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.sass']
})
export class DisplayComponent implements OnInit {

  treeData: ListNode[];
  treeControl: NestedTreeControl<ListNode>;

  constructor(private appService: AppService, private treeService: TreeService, ) { 
    this.treeData = treeService.treeData;
    this.treeControl = treeService.treeControl;
  }

  ngOnInit(): void {}

  saveTree() {
    this.treeService.saveTree(this.treeService.treeData);
    this.appService.openSnackBar('Tree was successfully saved', 'Ok');
  }

  removeTrees() {
    this.treeData = [];
    this.treeService.removeTrees();
  }

  hasChild = (_: number, node: ListNode) => !!node.children && node.children.length > 0;

}
