import { Injectable } from '@nestjs/common';
import {
  FormDefinitions,
  FormDefinitionsAttributes,
} from '../models/formDefinitions';

@Injectable()
export class FormDefinitionsService {
  async create(createFormDefinitionDto: any): Promise<FormDefinitions> {
    const formDefinition = await FormDefinitions.create(
      createFormDefinitionDto,
    );
    return formDefinition;
  }

  async findAll(): Promise<FormDefinitions[]> {
    const formDefinitions = await FormDefinitions.findAll({
      order: [['difficultyLevel', 'ASC']],
    });

    return formDefinitions;
  }

  async findOne(id: number): Promise<FormDefinitions | null> {
    const formDefinition = await FormDefinitions.findOne({
      where: {
        id,
      },
    });

    return formDefinition;
  }

  async findByBeltRank(beltRank: string): Promise<FormDefinitions[]> {
    const formDefinitions = await FormDefinitions.findAll({
      where: {
        beltRank: beltRank,
      },
      order: [['difficultyLevel', 'ASC']],
    });

    return formDefinitions;
  }

  async update(
    id: number,
    updateFormDefinitionDto: any,
  ): Promise<FormDefinitions | null> {
    const [affectedCount] = await FormDefinitions.update(
      updateFormDefinitionDto,
      {
        where: { id },
      },
    );

    if (affectedCount === 0) {
      return null;
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const affectedCount = await FormDefinitions.destroy({
      where: { id },
    });

    return affectedCount > 0;
  }

  // Bulk insert method for seeding data
  async bulkCreate(formDefinitions: any[]): Promise<FormDefinitions[]> {
    return await FormDefinitions.bulkCreate(formDefinitions);
  }
}
