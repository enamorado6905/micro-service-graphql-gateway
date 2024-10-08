import { PaginationArgsDto } from '../../dto/args/pagination.args.dto';
import { PaginateInterface } from '../../interfaces/pagination/paginated.interface';

/**
 * The `BaseService` class is an abstract generic class designed to define a standard
 * structure for service classes in an application. It uses generics to allow flexibility
 * in the type of data it handles, making it reusable for different data models.
 *
 * This class provides a blueprint for CRUD (Create, Read, Update, Delete) operations
 * and is intended to be extended by specific service classes that implement these operations.
 *
 * @template T The type of the entity that the service will handle.
 */
export abstract class AbstractMethodOperation<T> {
  /**
   * Abstract method to find and return all instances of type T.
   *
   * @returns A Promise containing an array of all instances of type T.
   */
  abstract find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<T>>;

  /**
   * Abstract method to find and return a specific instance of type T by its identifier.
   *
   * @param id The identifier (string or number) of the instance to find.
   * @returns A Promise containing the found instance of type T, wrapped in a PaginateInterface.
   */
  abstract getById(id: string): Promise<T>;

  /**
   * Abstract method to find and return a specific instance of type T by its identifier.
   *
   * @param filter The identifier object of the instance to find.
   * @returns A Promise containing the found instance of type T, wrapped in a PaginateInterface.
   */
  abstract getOne(filter: object): Promise<T>;

  /**
   * Abstract method to create a new instance of type T.
   *
   * @param item The instance of type T to be created.
   * @returns A Promise containing the newly created instance of type T.
   */
  abstract create(item: object): Promise<T>;

  /**
   * Abstract method to update an existing instance of type T by its identifier.
   *
   * @param id The identifier (string) of the instance to be updated.
   * @param item The updated data for the instance of type T.
   * @returns A Promise containing the updated instance of type T.
   */
  abstract update(id: string | number, item: object): Promise<T>;

  /**
   * Abstract method to delete an existing instance of type T by its identifier.
   *
   * @param id The identifier (string) of the instance to be deleted.
   * @returns A Promise containing the deleted instance of type T.
   */
  abstract delete(id: string): Promise<T>;

  /**
   * Abstract method to show total an existing instance of type T by its identifier.
   *
   * @returns A Promise containing the show total instance of type T.
   */
  abstract total(): Promise<number>;
}
