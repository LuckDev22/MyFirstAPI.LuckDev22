import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProduct, TProductReq } from "./interfaces";

export const nameChecked = (
  req: Request,
  resp: Response,
  next: NextFunction
): void | Response => {
  const dataProducts: TProductReq[] = req.body;

  dataProducts.map((product) => {
    const productCheck = market.some(
      (prodCheck) => prodCheck.name === product.name
    );
    if (productCheck) {
      return resp.status(409).json({
        error: "Product already registered",
      });
    }
    return next();
  });
};

export const idChecked = (req: Request,
resp: Response,
next: NextFunction
): void | Response => {

  const id = Number(req.params.id);

  const findIndex = market.findIndex((product) => product.id === id);

  if (findIndex === -1) {
    return resp.status(404).json({
      error: "Product not found",
    });
  }

  resp.locals.prodId = findIndex
  return next();
};


export const filterProductBySection = (
  req: Request,
  resp: Response,
  next: NextFunction
): void | Response => {
  const { section } = req.query;
  const filterSection: IProduct[] = market.filter(
    (prod) => prod.section === section
  );

  if (filterSection.length > 0) {
    resp.locals.market = filterSection;
    return next();
  }

  resp.locals.market = market;

  return next();
};
