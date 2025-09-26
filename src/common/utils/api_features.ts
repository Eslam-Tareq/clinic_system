import { Repository } from 'typeorm';
import { GetAllQueryDto } from '../../time-slots/dtos/get-all-query.dto';

export class ApiFeatures {
  public dataBaseQuery: string;
  public Repo: Repository<any>;
  public queryObj: GetAllQueryDto;
  public query: Promise<any>;
  public paginationMeta: any;
  constructor(dataBaseQuery: string, queryObj: GetAllQueryDto) {
    this.dataBaseQuery = dataBaseQuery;
    this.queryObj = queryObj;
    this.paginationMeta = {
      currentPage: 1,
      limit: 7,
      numOfPages: 1,
      totalItems: 0,
    };
  }
  paginate(totalItems: number) {
    const page = this.queryObj?.page * 1 || 1;
    const limit = this.queryObj?.limit * 1 || 7;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    this.paginationMeta.currentPage = page;
    this.paginationMeta.limit = limit;
    this.paginationMeta.numOfPages = Math.ceil(totalItems / limit);
    if (endIndex < totalItems) {
      this.paginationMeta.nextPage = page + 1;
    }
    if (skip > 0) {
      this.paginationMeta.perviousPage = page - 1;
    }
    this.paginationMeta.totalItems = totalItems;
    this.paginationMeta.numOfItems = 0;
    this.dataBaseQuery = this.dataBaseQuery + `LIMIT ${limit} OFFSET ${skip}`;
    return this.paginationMeta;
  }
}
