import { Injectable } from '@angular/core';
import { ListNode } from '../models/ListNode';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private _treeControl = new NestedTreeControl<ListNode>(node => node.children);
  private _treeData = new MatTreeNestedDataSource<ListNode>();
  private static STORAGE_KEY: string = 'tree';

  constructor(private storageService: StorageService) {
    // TODO: initially get it from storage or set empty array
    this._treeData.data = this.storageService.check(TreeService.STORAGE_KEY) ? JSON.parse(this.storageService.get(TreeService.STORAGE_KEY)) : []; 
  }

  public get treeData(): ListNode[] {
    return this._treeData.data;
  }

  public set treeData(tree: ListNode[]) {
    this._treeData.data = tree;
  }

  public get treeControl(): NestedTreeControl<ListNode> {
    return this._treeControl;
  }

  public saveTree(tree: ListNode[]) {
    this.storageService.set(TreeService.STORAGE_KEY, JSON.stringify(tree));
  }

  public removeTrees() {
    this.treeData = [];
    this.storageService.remove(TreeService.STORAGE_KEY);
  }

}
