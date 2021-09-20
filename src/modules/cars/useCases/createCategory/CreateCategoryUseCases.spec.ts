import { AppError } from "../../../../shared/errors/AppError";
import { CreateCategoryRepositoryInMemory } from "../../repositories/inmemory/CreateCategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// triplo aa pattern (arrange, action, assert)
let createCategoryUseCases: CreateCategoryUseCase;
let createCategoryRepositoryInMemory: CreateCategoryRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    createCategoryRepositoryInMemory = new CreateCategoryRepositoryInMemory();
    createCategoryUseCases = new CreateCategoryUseCase(
      createCategoryRepositoryInMemory
    );
  });
  it("should be able to create a new category", async () => {
    // arrange
    const category = {
      name: "test category",
      description: "test description",
    };
    await createCategoryUseCases.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await createCategoryRepositoryInMemory.findByName(
      category.name
    );
    // action
    expect(categoryCreated).toHaveProperty("id");
    expect(categoryCreated).toBeDefined();
  });
  it("Should not to be able to create a new category if name exists", async () => {
    const category = {
      name: "invalidcategory",
      description: "invaliddescription",
    };
    await createCategoryUseCases.execute({
      name: category.name,
      description: category.description,
    });
    await expect(
      createCategoryUseCases.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(
      new AppError(
        `Já existe uma categoria com o nome ${category.name} cadastrada`,
        409
      )
    );
  });
});
