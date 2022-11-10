/**
 * Module dependencies.
 */
import { Market, getListInput } from "../interfaces/IMarket";
import MarketModel from "../models/Market";
import ProductModel from "../models/Product";

const createMarketDao = async (data: Market) => {
  const market = new MarketModel(data);
  await market.save();

  return market;
};

const getProductDao = async (productId: string) => {
  return await ProductModel.findOne({ _id: productId, isdelete: false }).exec();
};

//상품 리스트 검색하기 dao. 본래 서비스 단에서 처리해야 하지만 시간이 없어서 리팩토링 하지 못했다.
const getListDao = async (data: getListInput) => {
  //아래의 처리는 타입스크립트의 요구를 충족하기 위해 작성됐다. 각각은 검색 및 정렬 옵션이다.
  //url 에서 query 를 받아오면 그 값이 있거나 없다. if 문은 그 값이 있을 때 실행된다.
  //값이 없다면 "" 또는 false 로 처리한다. 이와 같은 처리는 mongoose 를 오류 없이 실행 시키고
  //타입스크립트의 요구를 충족하기 위함이다.

  if (data.inputText !== undefined) {
    data.inputText = JSON.parse(data.inputText);
  }

  if (data.nation !== undefined) {
    data.nation = JSON.parse(data.nation);
  }

  if (data.category !== undefined) {
    data.category = JSON.parse(data.category);
  }

  if (data.sortType !== undefined) {
    data.sortType = JSON.parse(data.sortType);
  }

  if (data.page !== undefined) {
    data.page = JSON.parse(data.page);
  }

  const name = data.inputText || "";
  const na = data.nation || "";
  const ca = data.category || "";
  const sortType = data.sortType || false;
  const page = +data.page;

  const maxList = 2;
  //두 가지 정렬 타입이 있다. sortType 이 false 거나 없다면 기본 정렬 방식인 최신 등록순
  //으로 한다. 만약 sortType 이 true 라면 order_deadline 이 빠른 순으로 정렬한다.
  if (sortType) {
    return await ProductModel.aggregate()
      .match({ isdelete: false })
      .match({ product_name: { $regex: name } })
      .match({ nation: { $regex: na } })
      .match({ category: { $regex: ca } })
      .sort({ order_deadline: 1 })
      .project({ sellerId: 0 })
      .project({ description: 0 })
      .project({ isdelete: 0 })
      .project({ created_at: 0 })
      .project({ updated_at: 0 })
      .project({ __v: 0 })
      .skip(maxList * (page - 1))
      .limit(maxList)
      .exec();
  } else {
    return await ProductModel.aggregate()
      .match({ isdelete: false })
      .match({ product_name: { $regex: name } })
      .match({ nation: { $regex: na } })
      .match({ category: { $regex: ca } })
      .sort({ updated_at: -1 })
      .project({ sellerId: 0 })
      .project({ description: 0 })
      .project({ isdelete: 0 })
      .project({ created_at: 0 })
      .project({ updated_at: 0 })
      .project({ __v: 0 })
      .skip(maxList * (page - 1))
      .limit(maxList)
      .exec();
  }
};

/**
 * Module exports.
 * @public
 */
export default { createMarketDao, getProductDao, getListDao };
