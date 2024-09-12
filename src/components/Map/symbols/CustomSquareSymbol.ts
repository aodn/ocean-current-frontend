class CustomSquareSymbol {
  width: number;
  height: number;
  data: Uint8Array;
  context?: CanvasRenderingContext2D;
  strokeStyle: string;
  lineWidth: number;

  constructor(size: number, strokeStyle: string = 'rgba(255, 255, 255, 1)', lineWidth: number = 4) {
    this.width = size;
    this.height = size;
    this.data = new Uint8Array(size * size * 4);
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  onAdd() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d', { willReadFrequently: true })!;
  }

  render() {
    if (!this.context) {
      return false;
    }

    // Clear the canvas
    this.context.clearRect(0, 0, this.width, this.height);

    // Set the stroke style and line width
    this.context.strokeStyle = this.strokeStyle;
    this.context.lineWidth = this.lineWidth;

    // Draw the outline of the square
    this.context.strokeRect(
      this.lineWidth / 2,
      this.lineWidth / 2,
      this.width - this.lineWidth,
      this.height - this.lineWidth,
    );

    // Get the pixel data
    const imageData = this.context.getImageData(0, 0, this.width, this.height);
    this.data = new Uint8Array(imageData.data.buffer);
    return true;
  }
}

export default CustomSquareSymbol;
