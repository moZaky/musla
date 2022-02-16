import errorCodes from "../common/constants/error-codes";
import response from "../common/helpers/error-handler";

class service {
  constructor(model) {
    this.model = model;
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Add new item.
   * @param {Data to be inserted in DB} data
   */
  async create(data) {
    try {
      let item = await this.model.create(data);
      if (item) return response.respond(false, false, item);
      else return response.respond(false, false, item);
    } catch (exception) {
      return response.respond(
        true,
        false,
        null,
        errorCodes.ENABLE_TO_SAVE_RECORD_TO_DATA_BASE,
        exception,
        "Not able to create new item.",
        "",
     
        `create#service`
      );
    }
  }

  /**
   * Loads all the data.
   * @param {Query passed by the application layer, which is the user query!} query
   */
  async read(query) {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    try {
      let items = await this.model.findOne(query).skip(skip).limit(limit);

      if (items) return response.respond(false, false, items);
      else return response.respond(false, false, items);
    } catch (exception) {
      return response.respond(
        true,
        false,
        null,
        errorCodes.ERROR_LOADING_DATA_FROM_DATABASE,
        exception,
        "Not able to load data.",
        "",
        `read#service`
      );
    }
  }

  /**
   * Loads all the data.
   * @param {Query passed by the application layer, which is the user query!} query
   */
  async readAll(query, projection = {}) {
    try {
      let items = await this.model
        .find(query, projection)
      let total = items.length;

      if (items) return response.respond(false, false, items);
      else return response.respond(false, false, items);
    } catch (exception) {
      return response.respond(
        true,
        false,
        null,
        errorCodes.ERROR_LOADING_DATA_FROM_DATABASE,
        exception,
        "Not able to load data.",
        "",
        `readAll#service`
      );
    }
  }

  async readAllWithPaging(query, projection = {}) {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    try {
      let items = await this.model
        .find(query, projection)
        .skip(skip)
        .limit(limit);
      let total = items.length;

      if (items) return response.respond(false, false, items);
      else return response.respond(false, false, items);
    } catch (exception) {
      return response.respond(
        true,
        false,
        null,
        errorCodes.ERROR_LOADING_DATA_FROM_DATABASE,
        exception,
        "Not able to load data.",
        "",
        `readAll#service`
      );
    }
  }

  /**
   * Update existing data
   * @param {Old data ID} id
   * @param {New data to be instered } data
   */
  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      });

      if (item) return response.respond(false, false, item);
      else return response.respond(false, false, item);
    } catch (exception) {
      return response.respond(
        true,
        false,
        null,
        errorCodes.ENABLE_TO_UPDATE_RECORD_IN_DATA_BASE,
        exception,
        "Not able to update data.",
        "",
        `update#service`
      );
    }
  }


  async updateWithoutValidators(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, {
        new: true
      });

      if (item) return response.respond(false, false, item);
      else return response.respond(false, false, item);
    } catch (exception) {
      return response.respond(
        true,
        false,
        null,
        errorCodes.ENABLE_TO_UPDATE_RECORD_IN_DATA_BASE,
        exception,
        "Not able to update data.",
        "",
        `updateWithoutValidators#service`
      );
    }
  }


  /**
   * Delete item.
   * @param {ID of element to be deleted} id
   */
  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id);

      if (item) return response.respond(false, false, item);
      else return response.respond(false, false, item);
    } catch (error) {
      return response.respond(
        true,
        false,
        null,
        errorCodes.ENABLE_TO_DELETE_FROM_DATABASE,
        exception,
        "Not able to delete data.",
        "",
        `delete#service`
      );
    }
  }

  /**
   * Update existing data by Query
   */
  async updateByQuery(query, data) {
    try {
      let item = await this.model.updateOne(query, data, {
        new: true,
        runValidators: true
      });
      
      if (item) return response.respond(false, false, item);
      else return response.respond(false, false, item);
    } catch (exception) {
      return response.respond(
        true,
        false,
        errorCodes.ENABLE_TO_UPDATE_RECORD_IN_DATA_BASE,
        exception,
        "Not able to update data",
        "",
        `updateByQuery#service`
      );
    }
  }
}

export default service;