import { Injectable } from '@nestjs/common';

@Injectable()
export class LifecycleServiceClass<T> {
  // This method takes the actual processing logic as a callback
  public async handleLifecycle(
    data: T,
    processFn: (data: T) => Promise<any>,
  ): Promise<any> {
    // 1. Pre-processing phase
    await this.preProcess(data);

    // 2. Processing phase (this is the business logic passed as a callback)
    const result = await processFn(data);

    // 3. Post-processing phase
    await this.postProcess(result);

    return result;
  }

  private async preProcess(data: T) {
    // Centralized pre-processing logic
    console.log('Pre-processing:', data);
  }

  private async postProcess(result: T) {
    // Centralized post-processing logic
    console.log('Post-processing result:', result);
  }
}
