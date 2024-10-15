import { DataTypes, Model, Sequelize } from 'sequelize';

import { Example } from '@/example/entities/example';
import {
    BaseExample,
    CreateExample,
} from '@/example/entities/types/example.type';
import { ExampleRepository } from '@/example/repositories/example.repository';

class ExampleModel
    extends Model<BaseExample, CreateExample>
    implements BaseExample
{
    public identifier: string;
    public message: string;
    public position?: number | undefined;
    public available: boolean;
    public createDate: string;
    public modifyDate: string;
}

export class ExampleMock implements ExampleRepository {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite',
        });

        ExampleModel.init(
            {
                identifier: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    allowNull: false,
                },
                message: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                position: {
                    type: DataTypes.NUMBER,
                    allowNull: true,
                },
                available: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                createDate: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                modifyDate: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize: this.sequelize,
                tableName: 'Example',
            },
        );
    }

    async save(data: Example): Promise<BaseExample> {
        await this.sequelize.sync();
        const result = await ExampleModel.create(data.toPlain());
        return result.toJSON();
    }

    async getOne(identifier: string): Promise<BaseExample | null> {
        await this.sequelize.sync();
        const result = await ExampleModel.findByPk(identifier);
        if (!result) return null;
        return result.toJSON();
    }
}
