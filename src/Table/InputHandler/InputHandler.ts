import { SelectedCell } from '../../types/TableSchema.types';

const readline = require('readline');

type Input = {
    sequence: string;
    name: string;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
};

enum MovementDirection {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

class InputHandler {
    private selectedCell: SelectedCell | undefined = undefined;

    constructor(
        private renderCb: (props: { selectedCell: SelectedCell | undefined }) => void
    ) {}

    public startListening() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (_chunk: string, input: Input) => {
            this.handleKeyPress(input);
        });
    }

    private handleKeyPress(input: Input) {
        switch (input.name) {
            case 'q':
                process.exit();
                break;

            case 'right':
                this.handleMoveSelection(MovementDirection.RIGHT);
                break;

            case 'left':
                this.handleMoveSelection(MovementDirection.LEFT);
                break;

            case 'up':
                this.handleMoveSelection(MovementDirection.UP);
                break;

            case 'down':
                this.handleMoveSelection(MovementDirection.DOWN);
                break;
        }
    }

    private handleMoveSelection(direction: MovementDirection) {
        if (!this.selectedCell) {
            this.selectedCell = { row: 0, column: 0 };
        } else {
            switch (direction) {
                case MovementDirection.DOWN:
                    this.selectedCell.row = this.selectedCell.row + 1;
                    break;
                case MovementDirection.UP:
                    this.selectedCell.row = Math.max(this.selectedCell.row - 1, 0);
                    break;
                case MovementDirection.LEFT:
                    this.selectedCell.column = Math.max(this.selectedCell.column - 1, 0);
                    break;
                case MovementDirection.RIGHT:
                    this.selectedCell.column = this.selectedCell.column + 1;
                    break;
            }
        }

        return this.renderCb({ selectedCell: this.selectedCell });
    }
}
export { InputHandler };
