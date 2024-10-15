export interface BaseExample {
    identifier: string;
    message: string;
    position?: number;
    available: boolean;
    createDate: string;
    modifyDate: string;
}

export type CreateExample = Omit<
    BaseExample,
    'identifier' | 'createDate' | 'modifyDate' | 'available'
> &
    Partial<Pick<BaseExample, 'available'>>;

export type ResponseExample = Omit<BaseExample, 'position'>;
