/**
 * Board foot logic for lumber.
 * Board feet per board equals thickness (inches) times width (inches)
 * times length (feet) divided by 12. One board foot is 144 cubic inches.
 */

export interface BoardFootInput {
  thicknessIn: number;
  widthIn: number;
  lengthFt: number;
  quantity: number;
  pricePerBoardFoot: number;
}

export interface BoardFootResult {
  boardFeetPerBoard: number;
  totalBoardFeet: number;
  totalCost: number;
  costPerBoard: number;
  linearFeet: number;
}

function assertPositive(value: number, label: string): number {
  if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${label} must be a positive number.`);
  return value;
}

export function boardFeetPerBoard(thicknessIn: number, widthIn: number, lengthFt: number): number {
  return (
    (assertPositive(thicknessIn, "Thickness") *
      assertPositive(widthIn, "Width") *
      assertPositive(lengthFt, "Length")) /
    12
  );
}

export function calculateBoardFoot(input: BoardFootInput): BoardFootResult {
  if (!Number.isInteger(input.quantity) || input.quantity < 1) {
    throw new RangeError("Quantity must be a whole number of at least 1.");
  }
  if (!Number.isFinite(input.pricePerBoardFoot) || input.pricePerBoardFoot < 0) {
    throw new RangeError("Price per board foot must be zero or more.");
  }
  const perBoard = boardFeetPerBoard(input.thicknessIn, input.widthIn, input.lengthFt);
  const totalBoardFeet = perBoard * input.quantity;
  return {
    boardFeetPerBoard: perBoard,
    totalBoardFeet,
    totalCost: totalBoardFeet * input.pricePerBoardFoot,
    costPerBoard: perBoard * input.pricePerBoardFoot,
    linearFeet: input.lengthFt * input.quantity,
  };
}
