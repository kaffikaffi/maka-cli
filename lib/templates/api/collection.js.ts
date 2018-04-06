import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

interface <%=name%>Collection {
  publicFields: any,
  privateFields: any,
  deny: any,
  schema: any
}
/**
 * @memberof Server.<%= name %>
 * @extends Mongo.Collection
 */
class <%= name %>Collection extends Mongo.Collection<<%=name%>Collection> {
  constructor() {
    super('<%= name %>');

    this.publicFields = {};
    this.privateFields = {};
    this.deny({
      insert() { return true; },
      update() { return true; },
      remove() { return true; },
    });

    this.schema = {};
  }

  find(selector, modifier) {
    return super.find(selector, modifier);
  }

  findOne(selector, modifier) {
    return super.findOne(selector, modifier);
  }

  /**
   * @public
   * @param { object } doc The document to inserted.
   * @param { object } callback The callback from invocation.
   * @returns { string } The _id of the new doc.
   */
  insert(doc) {
    if (this._hasSchema()) {
      check(doc, this.schema);
    }
    return super.insert(doc);
  }

  /**
   * @public
   * @param { object | string } selector The mongodb selector.
   * @param { object } modifier The mongodb modifier.
   * @returns { string } The _id of the document updated.
   * */
  update(selector, modifier) {
    if (this._hasSchema()) {
      check(modifier.$set, this.schema);
    }

    return super.update(selector, modifier);
  }

  /**
   * @public
   * @param { object | string } selector The mongodb selector.
   * @returns { string } The _id of the document being removed.
   */
  remove(selector) {
    return super.remove(selector);
  }

  // Helper method
  _hasSchema = () => {
    const { schema } = this;
    if (schema) {
      return (Object.keys(schema).length !== 0
              && schema.constructor === Object);
    }
  }
}

/**
 * @memberof Server.<%= name %>
 * @member <%= name %>
 */
const <%= name %> = new <%= name %>Collection();
export default  <%= name %>;