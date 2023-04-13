import {SIDES} from '../constants';
import {Entity} from '../entity';
import {Go} from './go';
import {Trait} from './trait';

class Enemy extends Trait {
  constructor() {
    super('enemy');
  }

  arrSides = [SIDES.LEFT, SIDES.RIGHT, SIDES.BOTTOM,SIDES.TOP]

  random(arr:string[]):string{
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand]
  }

  excludeDirection(arr:string[], direction:string):string[]{
    arr = arr.filter(function( obj:string ) {
      return obj !== direction;
    });
    return arr
  }

  obstruct(entity: Entity, side: SIDES): void {

    const go = entity.getTrait('go') as Go;
    const arrDirections = this.excludeDirection(this.arrSides, side);
    //console.log('side = ', side,'arrDirections = ',arrDirections)
    const newSide = this.random(arrDirections);
    console.log('side= ', side,' newSide = ', newSide);
    go.side = SIDES.LEFT;

    if (newSide===SIDES.LEFT){
      go.directionX = -1
      go.side = SIDES.LEFT;
    }
    else if(newSide===SIDES.RIGHT){
      go.directionX = +1
      go.side = SIDES.RIGHT;
    }
    else if(newSide===SIDES.TOP){
      go.directionY = -1
      go.side = SIDES.TOP;
    }
    else {
      go.directionY = +1
      go.side = SIDES.BOTTOM;
    }
  }
}

export { Enemy };
