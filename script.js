        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var lastX;
        var lastY;
        var strokeColor = "red";
        var strokeWidth = 2;
        var canMouseX;
        var canMouseY;
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var isMouseDown = false;
        var circles = [];
        var drag = false;

        function makeCircle(x, y, radius, fill) {
        	console.log("here");
		    var circle = {
		        x: x,
		        y: y,
		        rad: radius,
		        fill: fill
		    }
		    circles.push(circle);
		    return (circle);
		    console.log("cicles"+circles);
		}

        function handleMouseDown(e) {
            canMouseX = parseInt(e.clientX - offsetX);
            canMouseY = parseInt(e.clientY - offsetY);

            // Put your mousedown stuff here
            lastX = canMouseX;
            lastY = canMouseY;
            isMouseDown = true;
            colr = getRandomColor();
        }

        function handleMouseUp(e) {
            canMouseX = parseInt(e.clientX - offsetX);
            canMouseY = parseInt(e.clientY - offsetY);

            // Put your mouseup stuff here
            isMouseDown = false;
        }

        function handleMouseOut(e) {
            canMouseX = parseInt(e.clientX - offsetX);
            canMouseY = parseInt(e.clientY - offsetY);

            // Put your mouseOut stuff here
            isMouseDown = false;
            makeCircle()
        }

        function handleMouseMove(e) {
            canMouseX = parseInt(e.clientX - offsetX);
            canMouseY = parseInt(e.clientY - offsetY);

            // Put your mousemove stuff here
            if (isMouseDown) {
                var dx = Math.abs(lastX - canMouseX);
                var dy = Math.abs(lastY - canMouseY);
                var midX = (lastX + canMouseX) / 2;
                var midY = (lastY + canMouseY) / 2;
                var r = Math.sqrt(dx * dx + dy * dy) / 2;
                //clearCircle(midX, midY);
                if (drag == false){
                	ctx.beginPath();
              	    ctx.arc(midX, midY, r, 0, 2 * Math.PI, true);
              	    //ctx.clearRect(0, 0, canvas.width, canvas.height);
              	    ctx.fillStyle = colr;
              	    var colrfill = ctx.fillStyle;
              	    makeCircle(midX, midY, r, colrfill);
              	    var colrfill = ctx.fillStyle;
              	    ctx.fill();
              	   }
              	else if (drag == true){
              		    for (var i = 0; i < circles.length; i++) {
					        var circle = circles[i]; 
					        makeCircle(circle);
						        if (ctx.isPointInPath(lastX, lastY)) {
						            circle.x += (mouseX - lastX);
						            circle.y += (mouseY - lastY);
						        }
						    }
						    lastX = mouseX;
						    lastY = mouseY;
						    drawAllCircles();
					    }

                //ctx.stroke();
            }
        }

        $("#canvas").mousedown(function (e) {
            handleMouseDown(e);
        });
        $("#canvas").mousemove(function (e) {
            handleMouseMove(e);
        });
        $("#canvas").mouseup(function (e) {
            handleMouseUp(e);
        });
        $("#canvas").mouseout(function (e) {
            handleMouseOut(e);
        });


        function getRandomColor() {
		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.round(Math.random() * 15)];
		    }
		    return color;
		}

		document.getElementById('reset').addEventListener('click', function() {
      	  ctx.clearRect(0, 0, canvas.width, canvas.height);
     	}, false);

     	document.getElementById('drag').addEventListener('click', function() {
      	  drag = true;
     	}, false);

     	document.getElementById('draw').addEventListener('click', function() {
      	  drag = false;
     	}, false);
