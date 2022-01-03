export default class Circle {
    constructor(xpos, ypos, radius, color, speed, windowWidth, windowHeight, onXAxis) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;

        this.onXAxis = onXAxis;


        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.fillStyle = this.color;
        context.arc(this.xpos, this.ypos, this.radius, 0, 2 * Math.PI, false);
        context.fill()
        context.closePath();
    }
    update(context, continueAnim) {
        // context.clearRect(0, 0, windowWidth, windowHeight);
        this.draw(context);

        if((this.xpos + this.radius) > this.windowWidth){
            this.dx = -this.dx
        }
        if((this.xpos - this.radius) < 0){
            this.dx = -this.dx
        }

        if((this.ypos + this.radius) > this.windowHeight){
            this.dy = -this.dy;
        }

        if((this.ypos - this.radius) < 0){
            this.dy = -this.dy;
        }
        if(continueAnim) {
            if(this.onXAxis){
                this.xpos += this.dx;
            }else{
                this.ypos += this.dy;
            }
        }else{
            // this.xpos = this.xpos;
            // this.ypos += this.ypos;
        }

        // if(!continueAnim) {console.log('fuck')}
    }
}
