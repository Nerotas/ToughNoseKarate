import { handleAddOrRemoveFromArray, removeFromArray, addToArray } from '../arrayOfObjectsHandlers';

describe('arrayOfObjectsHandlers', () => {
  describe('handleAddOrRemoveFromArray', () => {
    it('should add item to array if it does not exist', () => {
      const array = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      const newItem = { id: 3, name: 'Item 3' };

      const result = handleAddOrRemoveFromArray(array, newItem);

      expect(result).toHaveLength(3);
      expect(result).toContain(newItem);
      expect(result).toEqual([...array, newItem]);
    });

    it('should remove item from array if it already exists', () => {
      const item1 = { id: 1, name: 'Item 1' };
      const item2 = { id: 2, name: 'Item 2' };
      const array = [item1, item2];

      const result = handleAddOrRemoveFromArray(array, item1);

      expect(result).toHaveLength(1);
      expect(result).not.toContain(item1);
      expect(result).toEqual([item2]);
    });

    it('should handle primitive types', () => {
      const array = ['apple', 'banana', 'cherry'];
      const newItem = 'date';

      const result = handleAddOrRemoveFromArray(array, newItem);

      expect(result).toHaveLength(4);
      expect(result).toContain(newItem);
    });

    it('should remove primitive type if it exists', () => {
      const array = ['apple', 'banana', 'cherry'];
      const existingItem = 'banana';

      const result = handleAddOrRemoveFromArray(array, existingItem);

      expect(result).toHaveLength(2);
      expect(result).not.toContain(existingItem);
      expect(result).toEqual(['apple', 'cherry']);
    });

    it('should handle complex nested objects', () => {
      const array = [
        { user: { id: 1, profile: { name: 'John' } } },
        { user: { id: 2, profile: { name: 'Jane' } } },
      ];
      const newItem = { user: { id: 3, profile: { name: 'Bob' } } };

      const result = handleAddOrRemoveFromArray(array, newItem);

      expect(result).toHaveLength(3);
      expect(result).toContain(newItem);
    });

    it('should remove complex nested objects if they exist', () => {
      const item1 = { user: { id: 1, profile: { name: 'John' } } };
      const item2 = { user: { id: 2, profile: { name: 'Jane' } } };
      const array = [item1, item2];

      const result = handleAddOrRemoveFromArray(array, item1);

      expect(result).toHaveLength(1);
      expect(result).not.toContain(item1);
      expect(result).toEqual([item2]);
    });

    it('should handle empty array', () => {
      const array: any[] = [];
      const newItem = { id: 1, name: 'Item 1' };

      const result = handleAddOrRemoveFromArray(array, newItem);

      expect(result).toHaveLength(1);
      expect(result).toContain(newItem);
    });

    it('should handle arrays with identical objects', () => {
      const item = { id: 1, name: 'Item 1' };
      const array = [item, { id: 2, name: 'Item 2' }, item];

      const result = handleAddOrRemoveFromArray(array, item);

      // Should remove all instances of the identical object
      expect(result).toHaveLength(1);
      expect(result).toEqual([{ id: 2, name: 'Item 2' }]);
    });
  });

  describe('removeFromArray', () => {
    it('should remove item from array if it exists', () => {
      const item1 = { id: 1, name: 'Item 1' };
      const item2 = { id: 2, name: 'Item 2' };
      const array = [item1, item2];

      const result = removeFromArray(array, item1);

      expect(result).toHaveLength(1);
      expect(result).not.toContain(item1);
      expect(result).toEqual([item2]);
    });

    it('should return same array if item does not exist', () => {
      const array = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      const nonExistentItem = { id: 3, name: 'Item 3' };

      const result = removeFromArray(array, nonExistentItem);

      expect(result).toHaveLength(2);
      expect(result).toEqual(array);
    });

    it('should handle primitive types', () => {
      const array = ['apple', 'banana', 'cherry'];
      const existingItem = 'banana';

      const result = removeFromArray(array, existingItem);

      expect(result).toHaveLength(2);
      expect(result).not.toContain(existingItem);
      expect(result).toEqual(['apple', 'cherry']);
    });

    it('should return same array if primitive type does not exist', () => {
      const array = ['apple', 'banana', 'cherry'];
      const nonExistentItem = 'grape';

      const result = removeFromArray(array, nonExistentItem);

      expect(result).toHaveLength(3);
      expect(result).toEqual(array);
    });

    it('should handle empty array', () => {
      const array: any[] = [];
      const item = { id: 1, name: 'Item 1' };

      const result = removeFromArray(array, item);

      expect(result).toHaveLength(0);
      expect(result).toEqual(array);
    });
  });

  describe('addToArray', () => {
    it('should add item to array if it does not exist', () => {
      const array = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      const newItem = { id: 3, name: 'Item 3' };

      const result = addToArray(array, newItem);

      expect(result).toHaveLength(3);
      expect(result).toContain(newItem);
      expect(result).toEqual([...array, newItem]);
    });

    it('should return same array if item already exists', () => {
      const item1 = { id: 1, name: 'Item 1' };
      const item2 = { id: 2, name: 'Item 2' };
      const array = [item1, item2];

      const result = addToArray(array, item1);

      expect(result).toHaveLength(2);
      expect(result).toEqual(array);
    });

    it('should handle primitive types', () => {
      const array = ['apple', 'banana', 'cherry'];
      const newItem = 'date';

      const result = addToArray(array, newItem);

      expect(result).toHaveLength(4);
      expect(result).toContain(newItem);
      expect(result).toEqual([...array, newItem]);
    });

    it('should return same array if primitive type already exists', () => {
      const array = ['apple', 'banana', 'cherry'];
      const existingItem = 'banana';

      const result = addToArray(array, existingItem);

      expect(result).toHaveLength(3);
      expect(result).toEqual(array);
    });

    it('should handle empty array', () => {
      const array: any[] = [];
      const newItem = { id: 1, name: 'Item 1' };

      const result = addToArray(array, newItem);

      expect(result).toHaveLength(1);
      expect(result).toContain(newItem);
      expect(result).toEqual([newItem]);
    });

    it('should handle complex nested objects', () => {
      const array = [
        { user: { id: 1, profile: { name: 'John' } } },
        { user: { id: 2, profile: { name: 'Jane' } } },
      ];
      const newItem = { user: { id: 3, profile: { name: 'Bob' } } };

      const result = addToArray(array, newItem);

      expect(result).toHaveLength(3);
      expect(result).toContain(newItem);
    });

    it('should not add duplicate complex nested objects', () => {
      const item1 = { user: { id: 1, profile: { name: 'John' } } };
      const item2 = { user: { id: 2, profile: { name: 'Jane' } } };
      const array = [item1, item2];

      const result = addToArray(array, item1);

      expect(result).toHaveLength(2);
      expect(result).toEqual(array);
    });
  });
});
