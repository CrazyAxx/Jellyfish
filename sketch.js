var J1;

function setup() {
  createCanvas( windowWidth , windowHeight );
  
  //new object
  J1 = new Jellyfish();
  
  colorMode(HSB);
}

function draw(){
   background ( 0 , 0 , 0 );
  
  //make it do the this. functions
  J1.make();
  J1.evolve();
}

var Jellyfish = function(){
  //how many tails I want
  var N = 5;
  
  //only want 1 body
  this.bodypos = createVector( random( 0 , width) , random( 0 , height) );
  //standard movement
  this.bodyv = p5.Vector.random2D();
  this.bodyv.mult( 2 , 3 );
  
  //want an array of tail pos (N)
  this.tailpos = new Array(N);
  this.midpos = new Array(N);
  this.mid2pos = new Array(N);
  
  //want an array of tail movements
  this.tailv = new Array(N);
  this.midv = new Array(N);
  this.mid2v = new Array(N);
  
  //for loop to create the array of tails
  for( n = 0 ; n < N ; n++ ){
    this.tailpos[n]= createVector( random( 0 , width ) , random( 0 , height) );
    this.tailv[n] = p5.Vector.random2D();
    this.tailv[n].mult( random( 1 , 2 ));
    
    this.midpos[n] =  createVector( random( 0 , width ) , random( 0 , height) );
    this.midv[n] = p5.Vector.random2D();
    this.midv[n].mult( random( 1 , 2 ));
    this.mid2pos[n] =  createVector( random( 0 , width ) , random( 0 , height) );
    this.mid2v[n] = p5.Vector.random2D();
    this.mid2v[n].mult( random( 1 , 2 ));
  }
  
  this.make = function(){
    //for loop for the color of the tails
    for( n = 0 ; n < N ;n++){
      noFill();
      
      //change the colors based on distances
      this.center = createVector(width/2 , height/2 );
      //distance from the center to the body
      this.dist1 = this.center.dist( this.bodypos );
      //distance from body to tail ends
      this.dist2 = this.bodypos.dist( this.tailpos[n] );
      //work in progress
      this.maxDist = sqrt( width*width + height*height );
      this.dist3 = this.dist2/this.maxDist;

      this.C1 = color( this.dist1 % 360 , 100 , 85 );
      this.C2 = color( this.dist2 % 360 , 100 , 85 );
      //ignore C3 its a work in progress
      this.C3 = lerpColor( this.C1 , this.C2 , this.dist3 );
      stroke(this.C2);
      // wip
      console.log( this.dist2/this.maxDist);
      
      //make the lines thicker
      strokeWeight( 3 );
      //create a bezier from the body to the tail parts
      bezier( this.bodypos.x , this.bodypos.y  , this.midpos[n].x , this.midpos[n].y , this.mid2pos[n].x , this.mid2pos[n].y , this.tailpos[n].x , this.tailpos[n].y);
    }
    fill( this.C1 );
    noStroke();
    ellipse( this.bodypos.x , this.bodypos.y , 3 );
  };
  
  this.evolve = function(){
    //standar evolve stuff
    this.bodypos.add( this.bodyv );
    for( n = 0 ; n < N ; n++ ){
      this.tailpos[n].add( this.tailv[n] );
      
      if( this.tailpos[n].x < 0 || this.tailpos[n].x > width ){
        this.tailv[n].x *=-1;
      }
      if( this.tailpos[n].y < 0 || this.tailpos[n].y > height ){
        this.tailv[n].y *=-1;
      }
      this.midpos[n].add( this.midv[n] );
      
      if( this.midpos[n].x < 0 || this.midpos[n].x > width ){
        this.midv[n].x *=-1;
      }
      if( this.midpos[n].y < 0 || this.midpos[n].y > height ){
        this.midv[n].y *=-1;
      }
      this.mid2pos[n].add( this.mid2v[n] );
      
      if( this.mid2pos[n].x < 0 || this.mid2pos[n].x > width ){
        this.mid2v[n].x *=-1;
      }
      if( this.mid2pos[n].y < 0 || this.mid2pos[n].y > height ){
        this.mid2v[n].y *=-1;
      }
    }
    if( this.bodypos.x < 0 || this.bodypos.x > width ){
      this.bodyv.x *=-1;
    }
    if( this.bodypos.y < 0 || this.bodypos.y > height ){
      this.bodyv.y *=-1;
    }
  };
};

function keyTyped() {
 if( key === 's' ) {
   saveCanvas( 'Jellyfish' , 'jpg' );
   console.log("saved");
 }
 if( key === 'n' ){
   background( 0 , 0 , 0 );
 }
}
