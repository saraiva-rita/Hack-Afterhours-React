const { Schema, model } = require('mongoose');

const leisureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    miniDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    spotUrl: {
      type: String,
    },
    imgUrl: {
      type: String,
      default: '/public/images/img-default.png',
    },
    schedule: {
      type: String,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Leisure = model('Leisure', leisureSchema);

module.exports = Leisure;
