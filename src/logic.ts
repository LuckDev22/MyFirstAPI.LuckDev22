import { Request, Response } from "express";
import { market } from "./database";
import { IProduct, TProductReq } from "./interfaces";

export const createProduct = (req: Request, resp: Response): Response => {
  const dataProducts: TProductReq[] = req.body;
  var id = market.length;
  var dateExpiration = new Date();
  dateExpiration.setDate(dateExpiration.getDate() + 365);

  const newProduct: IProduct[] = dataProducts.map((product) => {
    return {
      id: id++,
      ...product,
      expirationDate: dateExpiration,
    };
  });

  market.push(...newProduct);

  const total = market.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price;
  }, 0);

  return resp.status(201).json({
    total: total,
    marketProducts: newProduct,
  });
};

export const listAllProducts = (req: Request, resp: Response): Response => {
  const total = market.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price;
  }, 0);

  return resp.status(200).json({
    total: total,
    marketProducts: market,
  });
};

export const listProductId = (req: Request, resp: Response): Response => {
  const { prodId } = resp.locals;
  return resp.status(200).json(market[prodId]);
};

export const updateProduct = (req: Request, resp: Response): Response => {
  const { prodId } = resp.locals;

  const id = Number(req.params.id);
  const findIndex = market.findIndex((product) => product.id === id);
  const newProd: TProductReq = req.body;

  if (newProd.name === market[findIndex].name) {
    return resp.status(409).json({
      error: "Product not found",
    });
  }

  market[prodId] = {
    ...market[prodId],
    ...newProd,
  };

  return resp.status(200).json(market[prodId]);
};

export const delProduct = (req: Request, resp: Response): Response => {
  const { prodId } = resp.locals;
  market.splice(prodId, 1);
  return resp.status(204).json();
};
