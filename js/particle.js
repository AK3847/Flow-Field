class Particle {
    constructor(cellW, cellH) {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 4;
        this.prevPos = this.pos.copy();

        this.update = function () {
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
        };

        this.follow = function (vec) {
            var x = floor(this.pos.x / cellW);
            var y = floor(this.pos.y / cellH);
            var index = x + y * ncol;
            var force = vec[index];
            this.applyforce(force);
        };

        this.applyforce = function (force) {
            this.acc.add(force);
        };

        this.getcolor = function () {
            let color = strokeCP
                .color()
                ._array.slice(0, 3)
                .concat(opacitySlide.value())
                .map((d) => d * 255);
            return color;
        };

        this.show = function () {
            stroke(this.getcolor());
            strokeWeight(0.6);
            strokeJoin(ROUND);
            line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
            this.updateprev();
        };

        this.updateprev = function () {
            this.prevPos.x = this.pos.x;
            this.prevPos.y = this.pos.y;
        };

        this.edges = function () {
            if ((this.pos.x > width) ||
                (this.pos.x < 0) ||
                (this.pos.y > height) ||
                (this.pos.y < 0)) {
                this.pos = createVector(random(width), random(height));
                this.updateprev();
            }
        };
    }
}
