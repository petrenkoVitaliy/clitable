class ParamsMemorizer<T> {
    private isQueuingState: boolean = false;
    private queuedProps: T | undefined = undefined;

    public get isQueuing() {
        return this.isQueuingState;
    }

    public startQueuing() {
        this.isQueuingState = true;
    }

    public stopQueuing() {
        this.isQueuingState = false;
    }

    public popParams() {
        const props = this.queuedProps;
        this.queuedProps = undefined;

        return props;
    }

    public pushParams(props: T | undefined) {
        this.queuedProps = props ? { ...props } : undefined;
    }
}

export { ParamsMemorizer };
