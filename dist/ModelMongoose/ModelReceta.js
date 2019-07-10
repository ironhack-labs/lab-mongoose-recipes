"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var EnumLevel;
(function (EnumLevel) {
    EnumLevel["EASY"] = "Easy Peasy";
    EnumLevel["AMATEUR"] = "Amateur Chef";
    EnumLevel["PRO"] = "UltraPro Chef";
})(EnumLevel = exports.EnumLevel || (exports.EnumLevel = {}));
var EnumDishType;
(function (EnumDishType) {
    EnumDishType["BREAKFAST"] = "Breakfast";
    EnumDishType["DISH"] = "Dish";
    EnumDishType["SNACK"] = "Snack";
    EnumDishType["DRINK"] = "Drink";
    EnumDishType["DESERT"] = "Dessert";
    EnumDishType["OTHER"] = "Other";
})(EnumDishType = exports.EnumDishType || (exports.EnumDishType = {}));
exports.RecetaSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    level: { type: String, enum: [EnumLevel.EASY, EnumLevel.AMATEUR, EnumLevel.PRO] },
    ingredients: { type: [String] },
    cuisine: { type: String },
    dishType: {
        type: String,
        enum: [EnumDishType.BREAKFAST, EnumDishType.DISH, EnumDishType.SNACK, EnumDishType.DRINK, EnumDishType.DESERT, EnumDishType.OTHER]
    },
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number },
    creator: { type: String },
    created: { type: Date, default: Date.now }
});
exports.ModelReceta = mongoose_1.default.model('receta', exports.RecetaSchema);
//# sourceMappingURL=ModelReceta.js.map