import { instanceToPlain } from 'class-transformer';

import { generateId } from '@/shared/utils/generateId';

import { BaseExample, CreateExample } from './types/example.type';

export class Example {
    private identifier: string;
    private message: string;
    private position?: number;
    private available: boolean;
    private createDate: string;
    private modifyDate: string;

    constructor(params: BaseExample) {
        this.identifier = params.identifier;
        this.message = params.message;
        this.position = params.position;
        this.available = params.available;
        this.createDate = params.createDate;
        this.modifyDate = params.modifyDate;
    }

    static create(params: CreateExample) {
        const now = new Date().toISOString();
        const obj: BaseExample = {
            ...params,
            available: params.available ?? true,
            identifier: generateId(),
            createDate: now,
            modifyDate: now,
        };
        return new Example(obj);
    }

    public toPlain(): BaseExample {
        return instanceToPlain(this) as BaseExample;
    }

    public get getIdentifier(): string {
        return this.identifier;
    }

    public get getMessage(): string {
        return this.message;
    }

    public get getPosition(): number | undefined {
        return this.position;
    }

    public get getAvailable(): boolean {
        return this.available;
    }

    public get getCreateDate(): string {
        return this.createDate;
    }

    public get getModifyDate(): string {
        return this.modifyDate;
    }
}
