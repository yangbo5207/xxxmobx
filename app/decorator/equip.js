export function ClothDecorator(target) {
    target.prototype.getCloth = function(cloth) {
        this.hp += cloth.hp;
        this.cloth = cloth.name;
    }
}

export function WeaponDecorator(target) {
    target.prototype.getWeapon = function(weapon) {
        this.atk += weapon.attack;
        this.weapon = weapon.name;
    }
    target.prototype.attack = function() {
        if (this.weapon) {
            console.log(`${this.nickname}装备了${this.weapon}，攻击更强了。职业：${this.career}`);
        } else {
            console.log(`${this.career}的基本攻击`);
        }
    }
}

export function ShoesDecorator(target) {
    target.prototype.getShoes = function(shoes) {
        this.speed += shoes.speed;
        this.shoes = shoes.name;
    }
    target.prototype.run = function() {
        if (this.shoes) {
            console.log(`${this.nickname}穿上了${this.shoes}，移动速度更快了。职业：${this.career}`);
        } else {
            console.log(`${this.career}的奔跑动作`);
        }
    }
}
