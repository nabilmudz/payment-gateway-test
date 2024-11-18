import BaseService from "../../base/service.base.js";
import prism from "../../config/db.js";

class TestService extends BaseService {
  constructor() {
    super(prism);
  }

  findAll = async (query) => {
    // const q = this.transformBrowseQuery(query);
    // const data = await this.db.ModelTest.findMany({ ...q });

    // if (query.paginate) {
    //   const countData = await this.db.ModelTest.count({ where: q.where });
    //   return this.paginate(data, countData, q);
    // }
    const data = "API BERFUNGSI"
    return data;
  };

  findById = async (id) => {
    const data = await this.db.ModelTest.findUnique({ where: { id } });
    return data;
  };

  create = async (payload) => {
    const data = await this.db.ModelTest.create({ data: payload });
    return data;
  };

  update = async (id, payload) => {
    const data = await this.db.ModelTest.update({ where: { id }, data: payload });
    return data;
  };

  delete = async (id) => {
    const data = await this.db.ModelTest.delete({ where: { id } });
    return data;
  };
}

export default TestService;  
