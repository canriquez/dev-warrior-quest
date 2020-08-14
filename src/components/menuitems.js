export class MenuItem {
    constructor(cf) {
        this.cf = cf;
        this.item = cf.scene.add.graphics();
        this.item.lineStyle(1, this.cf.c1);
        this.item.fillStyle(this.cf.c1, 2);
        this.item.strokeRect(this.cf.a, this.cf.b, this.cf.c, this.cf.d);
        //this.item.fillRect(this.cf.a, this.cf.b, this.cf.c, this.cf.d);
        this.item.name = this.cf.name;
    }
    select() {
        this.item.lineStyle(1, this.cf.c1)
        this.item.fillStyle(this.cf.c1, 2);;
        this.item.strokeRect(this.cf.a, this.cf.b, this.cf.c, this.cf.d);
        //this.item.fillRect(this.cf.a, this.cf.b, this.cf.c, this.cf.d);
    };

    deselect() {
        this.item.lineStyle(1, this.cf.c2);
        this.item.fillStyle(this.cf.c2, 2);
        this.item.strokeRect(this.cf.a, this.cf.b, this.cf.c, this.cf.d);
        //this.item.fillRect(this.cf.a, this.cf.b, this.cf.c, this.cf.d);
    };
}

export default MenuItem;