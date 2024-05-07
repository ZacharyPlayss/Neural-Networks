var binaryCoordinates = [];
var imageCircleCoordinates = [];

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var totalImages = 6;
    var imageHeight = canvas.height / totalImages;

    // Define images and their positions
    var images = [
        { src: './images/ONE.png', number: 0 },
        { src: './images/TWO.png', number: 0 },
        { src: './images/THREE.png', number: 0 },
        { src: './images/FOUR.png', number: 0 },
        { src: './images/FIVE.png', number: 0 },
        { src: './images/SIX.png', number: 0 }
    ];

    // Draw the images and number circles
    for (var i = 0; i < images.length; i++) {
        var y = i * imageHeight + imageHeight / 2;
        drawImage(images[i], y);
    }

    // Function to draw image
    function drawImage(imageData, y) {
        var image = new Image();
        image.src = imageData.src;
        image.onload = function () {
            ctx.drawImage(this, canvas.width - 120, y - 50, 100, 100); // Adjust image size and position as needed
            drawNumberCircle(canvas.width - 160, y, imageData.number);
        };
    }

    // Function to draw number circle
    function drawNumberCircle(x, y, number) {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(number, x, y + 6);
        ctx.closePath();
    
        // Save coordinates to array
        imageCircleCoordinates.push({ x: x, y: y, number: number });
    }

    // Image upload handling
    var upload = document.getElementById('upload');
    upload.addEventListener('change', handleImageUpload);
    function resetCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        binaryCoordinates = [];
        imageCircleCoordinates = [];
        for (var i = 0; i < images.length; i++) {
            var y = i * imageHeight + imageHeight / 2;
            drawImage(images[i], y);
        }
    }
    var numbers = [1, 2, 3, 4, 5, 6];
    function handleImageUpload(event) {
        resetCanvas();
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.onload = function () {
                    var binaryData = getImageBinary(img);
                    displayBinaryCircles(binaryData);
                    connectCircles();
                    calculateOutcomes(binaryData);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    
    function getImageBinary(image) {
        var binaryData = [];
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        var imageData = ctx.getImageData(0, 0, image.width, image.height);
        var pixels = imageData.data;

        for (var i = 0; i < pixels.length; i += 4) {
            // Convert pixel to binary (1 for black, 0 for white)
            var isBlack = pixels[i] < 128 || pixels[i + 1] < 128 || pixels[i + 2] < 128;
            binaryData.push(isBlack ? 1 : 0);
        }

        return binaryData;
    }

    function displayBinaryCircles(binaryData) {
        var circleRadius = 5;
        var circleSpacing = 10;
        var startX = 50;
        var startY = 50; 
    
        
        var availableHeight = window.innerHeight - startY * 2; 
        var maxBitCount = Math.floor(availableHeight / (circleRadius * 2 + circleSpacing));
    
        if (binaryData.length > maxBitCount) {
            circleSpacing = (availableHeight - binaryData.length * circleRadius * 2) / (binaryData.length - 1);
        }

        binaryCoordinates = [];
    
        for (var i = 0; i < binaryData.length; i++) {
            var x = startX;
            var y = startY + i * (circleRadius * 2 + circleSpacing); 
            drawBinaryCircle(x, y, circleRadius, binaryData[i]);

            binaryCoordinates.push({ x: x, y: y, value: binaryData[i] });
        }
    }

    function drawBinaryCircle(x, y, radius, value) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = value === 1 ? 'black' : 'white';
        ctx.fill();
        ctx.fillStyle = value === 1 ? 'white' : 'black';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value, x, y + 6);
        ctx.closePath();
    }

    function connectCircles() {
        ctx.strokeStyle = 'black'; 
    
        
        var binaryOffsetX = 10; 
        var imageOffsetX = -10; 
    
        for (var i = 0; i < binaryCoordinates.length; i++) {
            var binaryX = binaryCoordinates[i].x + binaryOffsetX; // Apply offset
            var binaryY = binaryCoordinates[i].y;
    
            for (var j = 0; j < imageCircleCoordinates.length; j++) {
                var imageX = imageCircleCoordinates[j].x + imageOffsetX; // Apply offset
                var imageY = imageCircleCoordinates[j].y;
    
                ctx.beginPath();
                ctx.moveTo(binaryX, binaryY);
                ctx.lineTo(imageX, imageY);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    function calculateOutcomes(binaryData){
        calculateForOutcomeOne(binaryData);
        calculateForOutTwo(binaryData);
        calculateForOutThree(binaryData);
        calculateForOutFour(binaryData);
        calculateForOutFive(binaryData);
        calculateForOutSix(binaryData);
    }
    function calculateForOutcomeOne(binaryData) {
        let outcome = (binaryData[24] * 50)
        outcome += (binaryData[8] * -10);
        outcome += (binaryData[12] * -10);
        outcome += (binaryData[22] * -10);
        outcome += (binaryData[26] * -10);
        outcome += (binaryData[36] * -10);
        outcome += (binaryData[38] * -10);
        outcome += (binaryData[40] * -10);
        drawNumberCircle(imageCircleCoordinates[0].x, imageCircleCoordinates[0].y, outcome);
    }
    function calculateForOutTwo(binaryData) {
        let outcome = (binaryData[8] * 30);
        outcome += (binaryData[12] * -10);
        outcome += (binaryData[22] * -10);
        outcome += (binaryData[24] * -10);
        outcome += (binaryData[26] * -10);
        outcome += (binaryData[36] * -10);
        outcome += (binaryData[38] * -10);
        outcome += (binaryData[40] * 30);
        console.log(imageCircleCoordinates);
        drawNumberCircle(imageCircleCoordinates[1].x, imageCircleCoordinates[1].y, outcome);
    }
    function calculateForOutThree(binaryData) {
        let outcome = (binaryData[8] * 25);
        outcome += (binaryData[12] * -10);
        outcome += (binaryData[22] * -10);
        outcome += (binaryData[24] * 25);
        outcome += (binaryData[26] * -10);
        outcome += (binaryData[36] * -10);
        outcome += (binaryData[38] * -10);
        outcome += (binaryData[40] * 25);
        console.log(imageCircleCoordinates);
        drawNumberCircle(imageCircleCoordinates[2].x, imageCircleCoordinates[2].y, outcome);
    }
    function calculateForOutFour(binaryData) {
        let outcome = (binaryData[8] * 10);
        outcome += (binaryData[12] * 30);
        outcome += (binaryData[22] * -10);
        outcome += (binaryData[24] * -10);
        outcome += (binaryData[26] * -10);
        outcome += (binaryData[36] * 30);
        outcome += (binaryData[38] * -10);
        outcome += (binaryData[40] * 10);
        console.log(imageCircleCoordinates);
        drawNumberCircle(imageCircleCoordinates[3].x, imageCircleCoordinates[3].y, outcome);
    }
    function calculateForOutFive(binaryData) {
        let outcome = (binaryData[8] * 10);
        outcome += (binaryData[12] * 20);
        outcome += (binaryData[22] * -10);
        outcome += (binaryData[24] * 30);
        outcome += (binaryData[26] * -10);
        outcome += (binaryData[36] * 20);
        outcome += (binaryData[38] * -10);
        outcome += (binaryData[40] * 10);
        console.log(imageCircleCoordinates);
        drawNumberCircle(imageCircleCoordinates[4].x, imageCircleCoordinates[4].y, outcome);
    }
    function calculateForOutSix(binaryData) {
        let outcome = (binaryData[8] * 10);
        outcome += (binaryData[12] * 10);
        outcome += (binaryData[22] * 50);
        outcome += (binaryData[24] * -10);
        outcome += (binaryData[26] * 50);
        outcome += (binaryData[36] * 10);
        outcome += (binaryData[38] * -10);
        outcome += (binaryData[40] * 10);
        console.log(imageCircleCoordinates);
        drawNumberCircle(imageCircleCoordinates[5].x, imageCircleCoordinates[5].y, outcome);
    }
};