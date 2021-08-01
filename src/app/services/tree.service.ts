import { Injectable } from '@angular/core';
import { ListNode, TreeBuildAccumulator } from '../models/Models';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private static STORAGE_KEY: string = 'tree';
  private _treeControl = new NestedTreeControl<ListNode>(node => node.children);
  private _treeData = new MatTreeNestedDataSource<ListNode>();
  private static NODES_NAMES: string[] = [
    'Banana','Orange','Lemon','Apple','Cherry','Coconut','Lime','Kiwi','Papaya','Raspberry',
    'Apricot','Blackberry','Blueberry','Fig','Grape','Mango','Nectarine','Pear','Pineapple','Strawberry'
  ];
  public showProgressBar: boolean = false;


  constructor(private storageService: StorageService) {
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

  public buildMockTree(...args: number[]): boolean {

    args.map(el => Math.floor(el));

    const [root_count, min_nested, max_nested, max_nesting] = args;
    const treeData: ListNode[] = this.generateTreeData(root_count, min_nested, max_nested, max_nesting);

    this.treeData = treeData;

    return this.treeData.length > 0;
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  
  private generateTreeData (rootCount: number, min_nested: number, max_nested:number, max_nesting:number) {
    
    const createNewChildren = (count: number) => {
        return this.createArray(count).map(this.createNode);
    }
    
    this.showProgressBar = true;

    const result: TreeBuildAccumulator = this.createArray(max_nesting + 1).reduce((reducer: TreeBuildAccumulator, _, index) => {

      if(!reducer.helper){
        const nodes = createNewChildren(rootCount)
        return {root: nodes, helper: nodes};
      } else{
          const helper: ListNode[] = [];
          reducer.helper.map((node: ListNode)=>{
              node.children = this.random(0,10) ? createNewChildren(this.random(min_nested, max_nested)) : [];
                helper.push(...node.children);                
            })
        return {...reducer, helper: helper }
      }

    }, {root: []});

    // this.showProgressBar = false;

    return result.root;
  }

  private createArray(count: number) {
    const arr = []
      for (let i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr;
  }
  
  private getRandomNodeName = () => {
    return TreeService.NODES_NAMES[this.random(0, TreeService.NODES_NAMES.length - 1)];
  }
  
  private createNode = () => {
    return {name: this.getRandomNodeName(), children: []};
  }

  private random (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
