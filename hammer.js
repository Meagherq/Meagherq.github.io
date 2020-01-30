$(document).ready(function(){
    var square = document.getElementById("pan-item");

    var squareContainer = document.getElementById("square-container");

    var manager = new Hammer.Manager(square);

    var Swipe = new Hammer.Swipe();

    manager.add(Swipe);

    var deltaX = 0;
    var deltaY = 0;

    manager.on('swipe', function(e) {
        var direction = e.offsetDirection;        
        if (direction === 4 || direction === 2) {
            deltaX = deltaX + e.deltaX;
            var squareBounds = square.getBoundingClientRect();
            var squareContainerBounds = squareContainer.getBoundingClientRect();
            console.log("Square: " + squareBounds.left);
            console.log("Container: " + squareContainerBounds.right);
            console.log("Delta: " + deltaX);
            console.log("OGDelta: " + e.deltaX)
            var translate3d = 'translate3d(' + deltaX + 'px, 0, 0)';
            if (deltaX < 0)
            {
                e.target.style.transform = 'translate3d(0px, 0, 0)';
                deltaX = 0;
            }
            else if(deltaX > squareContainerBounds.right - 95)
            {
                e.target.style.transform = 'translate3d(' + (squareContainerBounds.right - 95) + 'px, 0, 0)';
                deltaX = squareContainerBounds.right - 95;
            }
            else 
            {
                e.target.style.transform = translate3d;
            }
        }
    });

    var myBlock = document.getElementById('square-container-parent-two');
    var mc = new Hammer(myBlock);
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
    mc.on("pan", handleDrag);   
    
    var lastPosX = 0;
    var lastPosY = 0;
    var isDragging = false;
    function handleDrag(ev) {
        // for convience, let's get a reference to our object
        var elem = ev.target;
        
        // DRAG STARTED
        // here, let's snag the current position
        // and keep track of the fact that we're dragging
        if ( ! isDragging ) {
            isDragging = true;
            lastPosX = elem.offsetLeft;
            lastPosY = elem.offsetTop;
        }
        
        // we simply need to determine where the x,y of this
        // object is relative to where it's "last" known position is
        // NOTE: 
        //    deltaX and deltaY are cumulative
        // Thus we need to always calculate 'real x and y' relative
        // to the "lastPosX/Y"
        var posX = ev.deltaX + lastPosX;
        var posY = ev.deltaY + lastPosY;
        
        // move our element to that position
        elem.style.left = posX + "px";
        
        // DRAG ENDED
        // this is where we simply forget we are dragging
        if (ev.isFinal) {
            isDragging = false;
        }
    }
});