const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let radius = centerY * 0.90; //reduce radius to 90%

class Clock {
    update() {
        const date = new Date();
        this.hour = date.getHours();
        this.second = date.getSeconds();
        this.minute = date.getMinutes();
    }
    paint() {

        let angle, x, y; //declare var

        //draw numbers on clock
        ctx.fillStyle = "#ffffff";
        ctx.font = radius * 0.13 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        for (let i = 1; i < 13; i++) {
            angle = i * Math.PI / 6;
            x = radius * Math.sin(angle);
            y = radius * Math.cos(angle);
            ctx.fillText(i.toString(), centerX + x, centerY - y);

        }

        //draw hour hand 

        angle = (this.hour * Math.PI / 6) +
            (this.minute * Math.PI / (6 * 60)) +
            (this.second * Math.PI / (360 * 60));
        x = (radius * 0.7) * Math.sin(angle);
        y = (radius * 0.7) * Math.cos(angle);

        this.drawHand(centerX, centerY, centerX + x, centerY - y, "white", radius * 0.05);


        // draw minute hand

        angle = (this.minute * Math.PI / 30) +
            this.second * Math.PI / (30 * 60);
        x = (radius * 0.9) * Math.sin(angle);
        y = (radius * 0.9) * Math.cos(angle);

        this.drawHand(centerX, centerY, centerX + x, centerY - y, "white", radius * 0.03);

        //draw second hand
        angle = this.second * Math.PI / 30;
        x = radius * Math.sin(angle);
        y = radius * Math.cos(angle);

        this.drawHand(centerX, centerY, centerX + x, centerY - y, "blue", radius * 0.02);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.05, 0, 2 * Math.PI);
        ctx.fill();



    }
    drawHand(fromX, fromY, toX, toY, color, width) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }
}

let clock = new Clock();
window.onload = () => {

    setInterval(show, 1000);
}
function show() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clock.update();
    clock.paint();
}

