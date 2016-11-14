class Task extends RocketChat.models._Base {
    constructor() {
        super('tasks');
    }
    findOneById(_id, options) {
        const query = { _id: _id };
        return this.findOne(query, options);
    }
    removeById(_id) {
        const query = { _id: _id };
        return this.remove(query);
    }
    create(data)
    {
        return this.insert(data);
    }
    findall()
    {
        return this.find();
    }
}
RocketChat.models.Task = new Task();