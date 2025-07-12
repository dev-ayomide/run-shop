import { Prisma } from "@prisma/client";
import { CartRepository } from "../repository";
import { CartItem } from "@prisma/client";

const cartRepo = new CartRepository();

export class CartService {
  async createCart(userId: string) {
    return await cartRepo.createCart(userId);
  }

  async addProductToCart(cartId: string, productId: string) {
    return await cartRepo.addProductToCart(cartId, productId);
  }

  async removeProductFromCart(id: string) {
    return await cartRepo.removeProductFromCart(id);
  }

  async getUserCart(userId: string) {
    const cart = await cartRepo.getUserCart(userId);
    if (cart.length > 0) {
      let groupedMap: { [sellerId: string]: CartItem[] } = {};

      for (let item of cart[0]?.cartItems) {
        const sellerId = item.product.sellerId;
        if (!groupedMap[sellerId]) groupedMap[sellerId] = [];
        groupedMap[sellerId].push(item);
      }
      return Object.entries(groupedMap).map(([sellerId, items]) => ({
        sellerId,
        items,
      }));
    }else{
      return []
    }
  }

  async addMultipleProductsToCart(
    cartId: string,
    items: { productId: string; quantity: number }[]
  ) {
    return await cartRepo.addMultipleProductsToCart(cartId, items);
  }
}
