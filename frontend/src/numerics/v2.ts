export class V2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    static zero(): V2 {
        return new V2(0, 0);
    }

    static one(): V2 {
        return new V2(1, 1);
    }

    static up(): V2 {
        return new V2(0, 1);
    }

    static down(): V2 {
        return new V2(0, -1);
    }

    static left(): V2 {
        return new V2(-1, 0);
    }

    static right(): V2 {
        return new V2(1, 0);
    }

    add(v: V2): V2 {
        return new V2(this.x + v.x, this.y + v.y);
    }

    sub(v: V2): V2 {
        return new V2(this.x - v.x, this.y - v.y);
    }

    mul(scalar: number): V2 {
        return new V2(this.x * scalar, this.y * scalar);
    }

    div(scalar: number): V2 {
        if (scalar === 0) throw new Error("Division by zero");
        return new V2(this.x / scalar, this.y / scalar);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalized(): V2 {
        const mag = this.magnitude();
        if (mag === 0) return V2.zero();
        return this.div(mag);
    }

    dot(v: V2): number {
        return this.x * v.x + this.y * v.y;
    }

    distance(v: V2): number {
        return this.sub(v).magnitude();
    }

    equals(v: V2): boolean {
        return this.x === v.x && this.y === v.y;
    }

    clone(): V2 {
        return new V2(this.x, this.y);
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}