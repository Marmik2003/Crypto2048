function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

Tile.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};

//for help button
function help() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
   x.style.display = "block";
    //x.style.opacity = "100";
  } else {
    x.style.display = "none";
    //x.style.opacity = "0";
  }
}