import { prisma } from "../../../utils/db";

export class CartRepository {
  async createCart(userId: string) {
    return await prisma.cart.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async addProductToCart(cartId: string, productId: string) {
    return await prisma.cartItem.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        cart: {
          connect: {
            id: cartId,
          },
        },
      },
    });
  }

  async addMultipleProductsToCart(
    cartId: string,
    items: { productId: string; quantity: number }[]
  ) {
    return await prisma.cartItem.createMany({
      data: items.map((item) => ({
        cartId,
        productId: item.productId,
        quantity: item.quantity,
      })),
      skipDuplicates: true,
    });
  }

  async removeProductFromCart(id: string) {
    return await prisma.cartItem.delete({
      where: {
        id,
      },
    });
  }

  async getUserCart(userId: string) {
    return await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: {
              include: {
                seller: {
                  select: { id: true, catalogueName: true },
                },
              },
            },
          },
        },
      },
    });
  }
}
