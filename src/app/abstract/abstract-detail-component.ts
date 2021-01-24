import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {AbstractService} from "./abstract-service";
import {SuperUser} from "./superUser";


export class AbstractDetailComponent<T extends SuperUser, S extends AbstractService<T>> {

  private _item: T;

  constructor(private route: ActivatedRoute,
              private _service: S,
              private location: Location) {
  }


  get item(): T {
    return this._item;
  }

  get service(): S {
    return this._service;
  }

  ngOnInit() {
    this.loadById();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // this._service.addOrUpdate(this._item).subscribe(cb => {
    //   if (cb !== null) {
    //     this.onItemSaved(cb);
    //     this.goBack()
    //   }
    // });
  }

  public onItemSaved(item: T) {

  }

  loadById(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // if (id != 0) {
    //   console.log("Load entity with id: " + id);
    //   this._service.getById(id).subscribe(item => {
    //     this._item = item;
    //     this.onItemLoaded(item)
    //   })
    // } else {
    //   console.log("Create empty abstract entity");
    //   this._item = Object.create(Superdto);
    // }
  }

  public onItemLoaded(item: T): void {

  }
}
