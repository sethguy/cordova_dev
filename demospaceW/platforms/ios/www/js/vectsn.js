function vect(x, y) {

    this.x = x;
    this.y = y;

    this.length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));


    this.clean = function(l) {

            var psx = this.x;
            if (Math.abs(this.x) < l) psx = 0;

            var psy = this.y;
            if (Math.abs(this.y) < l) psy = 0;
            return new vect(psx, psy);
        } //clean

    this.same = function(v) {
            var out = this.x === v.x && this.y === v.y;

            return out;
        } //sam


    this.disTo = function(v) {

            return Math.sqrt(Math.pow(v.x - this.x, 2) + Math.pow(v.y - this.y, 2));

        } //disTo

    this.ang = function() {
            var oo = new vect(1, 0);

            return Math.acos(this.dot(oo) / (this.mag() * oo.mag())) * (180 / Math.PI)
        } //ang

    this.angdiff = function(v) {

            return this.ang() - v.ang();
        } //angdiff

    this.mag = function() {

            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        } //mag

    this.dot = function(v) {
            return this.x * v.x + this.y * v.y;
        } //dot


    this.shift = function(v) {

            var nv = new vect(this.x + v.x, this.y + v.y);


        } //shift by

    this.mult = function(m) {

            var a = this.x;
            var b = this.y;
            var x1 = m.x1;
            var x2 = m.x2;

            var y1 = m.y1;
            var y2 = m.y2;

            var nx = a * x1 + b * x2;
            var ny = a * y1 + b * y2;

            var nv = new vect(nx, ny);
            return nv;
        } //mult

    this.unit = function(n) {

            var u = new vect(this.x / (this.length * (1 / n)), this.y / (this.length * (1 / n)));

            return u;
        } //unit

    this.prnt = function() {
        var s = " x " + this.x + "  y " + this.y;
        return s;
    }

} //vect


function vect2(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.prnt = function() {
        var s = " x1 " + this.x1 + "  y1 " + this.y1 + " x2 " + this.x2 + "  y2 " + this.y2;
        return s;
    }


} //vect


function mat(x1, x2, y1, y2) {

    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;

} //mat

function rotm(a) {

    a = a * (Math.PI / 180);

    return new mat(Math.cos(a), -Math.sin(a), Math.sin(a), Math.cos(a));
} //rot


function ltest() {
    console.log("  ltest----------- ");
    var v1 = new vect(-1, 0);
    console.log("  v1" + v1.prnt());

    var v2 = v1.mult(rotm(-90));

    console.log(" v2 " + v2.prnt());


    console.log("  ------ltest----------- ");
}
