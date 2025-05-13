<?php
require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php');
require($_SERVER['DOCUMENT_ROOT'] . '/buy/logic.php');
use \Bitrix\Main\Page\Asset;
$zhk = new Zhk;
$zhk_object = $zhk->get_zhk($_REQUEST["ZHK_CODE"]);
if (!$zhk_object["FIELDS"]){
    LocalRedirect("/buy/");
}
$base = "buy";
$type = $zhk_object["TYPE"];



$APPLICATION->AddChainItem('Регионы', '/' . $base . '/');
$APPLICATION->AddChainItem($zhk_object["REGION"]["NAME"], '/' . $base . '/' . $zhk_object["REGION"]["ID"] . '/');
$APPLICATION->AddChainItem($zhk_object["FIELDS"]["NAME"], '/' . $base . '/' . $zhk_object["FIELDS"]["ID"] . '/');

$APPLICATION->SetPageProperty("TITLE", "Купить недвижимость в ЖК ". $zhk_object["FIELDS"]["NAME"]);
$APPLICATION->SetPageProperty("description", $zhk_object["FIELDS"]["NAME"] . " Купить квартиру, студию, коммерческое помещение, машино-место в ипотеку, с использованием материнского капитала, военная ипотека, господдержка и гарантии.");
$APPLICATION->SetTitle("Купить недвижимость в ЖК " . $zhk_object["FIELDS"]["NAME"]);
Asset::getInstance()->addJs( SITE_TEMPLATE_PATH ."/frontend/assets/bundle.js", true);
?>

<link rel="stylesheet" href="/buy/style.css">
<link rel="stylesheet" href="/buy/css/popup.css">

<link rel="stylesheet" href="/buy/css/style-buy.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.7.2/nouislider.css" integrity="sha512-MKxcSu/LDtbIYHBNAWUQwfB3iVoG9xeMCm32QV5hZ/9lFaQZJVaXfz9aFa0IZExWzCpm7OWvp9zq9gVip/nLMg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://api-maps.yandex.ru/2.1/?apikey=5e33f880-b4f5-4a63-872f-a8a296854c7b&lang=ru_RU" type="text/javascript"></script>

<!-- <?if ($_GET["test"]){?>
    <pre>
        <?print_r($zhk_object["CORPUSES"]["FIELDS"]);?>
    </pre>
<?}?> -->
<div class="need-help-popup-overlay"></div>
<div class="need-help-popup">
    <?require($_SERVER['DOCUMENT_ROOT'] . '/buy/form_standart_page.php');?>
</div>

<section class="zhk_text">
    
    <div class="zhk_text_container" style="background-image: url('<?=CFile::GetPath($zhk_object["FIELDS"]["DETAIL_PICTURE"])?>'); background-size: cover">
        <!-- <h1><?=$zhk_object["FIELDS"]["NAME"]?></h1> -->
    </div>
    
</section>
<section class="zhk_info">
    <div class="zhk_info_container">
        <div class="about_title">
            О проекте
        </div>
        <div class="about_desc">
            <div class="about_desc_text">
                <?=$zhk_object["FIELDS"]["DETAIL_TEXT"]?>
            </div>
            <!-- <div class="about_desc_bottom_row">
                <a class="about_more_link">
                    Подробнее
                </a>
                <a href="" class="about_presentation_link">
                    Скачать презентацию
                </a>
            </div> -->
        </div>
    </div>
</section>


<?

if ($type=="flat"){
    $filter_base = "flats_zhk";
    $text = "Квартира № " . $flat["PROPS"]["FLAT_NUMBER"]["VALUE"];
} else if ($type=="comm") {
    $filter_base = "commerce_zhk";
    $text = $flat_object["FIELDS"]["NAME"];
} else if ($type=="parkcomm") {
    $filter_base = "parking_zhk";
    $text = $flat_object["PROPS"]["TYPE"]["VALUE"] . " № " . $flat_object["FIELDS"]["NAME"];

}
?>
<?if ($zhk_object["FLATS"]){?>
<section class="regions">
    
    <form class="buy_filter" action="/<?=$base?>/<?=$filter_base?>/<?=$zhk_object["FIELDS"]["CODE"]?>/">
        <div class="buy_filter_row">
            <div class="buy_filter_types">
                <?if ($zhk_object["PROPS"]["KV_COUNT"]["VALUE"]){?>
                <a href="/<?=$base?>/flats_zhk/<?=$zhk_object["FIELDS"]["CODE"]?>/" class="buy_filter_types_tile <?if ($type == "flat"){?>buy_filter_types_tile__active<?}?>">
                    Квартиры 
                </a>
                <?}?>
                <?if ($zhk_object["PROPS"]["COMM_COUNT"]["VALUE"]){?>
                <a href="/<?=$base?>/commerce_zhk/<?=$zhk_object["FIELDS"]["CODE"]?>/" class="buy_filter_types_tile <?if ($type == "comm"){?>buy_filter_types_tile__active<?}?>">
                    Коммерческая недвижимость
                </a>
                <?}?> 
                <?if ($zhk_object["PROPS"]["PARKING_COUNT"]["VALUE"]){?>
                <a href="/<?=$base?>/parking_zhk/<?=$zhk_object["FIELDS"]["CODE"]?>/?parking=1" class="buy_filter_types_tile <?if ($type == "parkcomm"){?>buy_filter_types_tile__active<?}?>">
                    Паркинг
                </a>
                <?}?>
                <?if ($zhk_object["PROPS"]["KLAD_COUNT"]["VALUE"]){?>    
                <a href="/<?=$base?>/parking_zhk/<?=$zhk_object["FIELDS"]["CODE"]?>/?kladovie=1" class="buy_filter_types_tile">
                    Кладовые
                </a>
                <?}?>

            </div>
            <button class="objects_button__white">
                Все фильтры
            </button>
        </div>
       
        <div class="buy_filter_row">
        <?if (count($zhk_object["FLATS"]) > 1){?>
            <? if ($type == "flat"){?>
            <div class="buy_filter_place_types">
                <!-- <label class="buy_filter_place_types_tile buy_filter_place_types_tile__active" >
                    Студия
                    <input type="checkbox" name="flattype[]" class="flattypecheckbox" value="studio" checked>
                </label> -->
                <label class="buy_filter_place_types_tile">
                    1
                    <input type="checkbox" name="flattype[]" class="flattypecheckbox" value="1">
                </label>
                <label class="buy_filter_place_types_tile">
                    2
                    <input type="checkbox" name="flattype[]" class="flattypecheckbox" value="2">
                </label>
                <label class="buy_filter_place_types_tile">
                    3
                    <input type="checkbox" name="flattype[]" class="flattypecheckbox" value="3">
                </label>
            </div>
            <?}?>
            <div class="buy_filter_price_range">
                <div class="slideInput-wrapper"> 
                    
                    <div class="slideInput-fields">
                        <div> <span>От </span>
                        <input class="slideInput-fields__input min" type="text" name="priceMin" data-min-value="<?=$zhk_object["MIN"]?>"/>
                        </div>
                        <div> <span>До</span>
                        <input class="slideInput-fields__input max" type="text" name="priceMax" data-max-value="<?=$zhk_object["MAX"]?>"/>
                        </div>
                    </div>
                    <div class="slideInput"></div>
                </div>
            </div>
            
            <button type="submit" class="objects_button">
                Показать <?=count($zhk_object["FLATS"])?>
            </button>
            <button class="drop_filter">
                Сбросить фильтр
            </button>
            <?}?>
        </div>
    </form>
    <div class="objects_wrapper">
        <?foreach ($zhk_object["FLATS"] as $flat){?>
            <?

            if ($type=="flat"){
                $filter_base = "flat";
                $text = "Квартира № " . $flat["PROPS"]["FLAT_NUMBER"]["VALUE"];
            } else if ($type=="comm") {
                $filter_base = "commerce_elem";
                $text = $flat["FIELDS"]["NAME"];
                //$text = "Коммерческое помещение № " . $flat["PROPS"]["FLAT_NUMBER"]["VALUE"];
            } else if ($type=="parkcomm") {
                $filter_base = "parking_elem";
                $text = $flat["PROPS"]["TYPE"]["VALUE"] . " № " . $flat["FIELDS"]["NAME"];
            }

            $main_photo = "/buy/images/flat.png";

            if ($flat["PROPS"]["FILE_PHOTO"]["VALUE"]){
                $main_photo = CFile::GetPath($flat["PROPS"]["FILE_PHOTO"]["VALUE"]);
            } else if ($flat["FIELDS"]["PREVIEW_PICTURE"]){
                $main_photo = CFile::GetPath($flat["FIELDS"]["PREVIEW_PICTURE"]);
            }  
            
            ?>
        <a href="/<?=$base?>/<?=$filter_base?>/<?=$flat["FIELDS"]["CODE"]?>/" class="region_card">
            <img src="<?=$main_photo?>" alt="" class="region_img">
            <div class="card_title">
                <?=$text?>
            </div>
            <div class="card_flat_description">
                Площадь: <?=$flat["PROPS"]["SQUARE"]["VALUE"]?>| Этаж: <?=$flat["PROPS"]["FLOOR"]["VALUE"]?>
            </div>
            <div class="card_flat_price">
            <span class="js_price"><?=$flat["PROPS"]["PRICE"]["VALUE"]?></span> ₽
            </div>
            <div class="card_flat_description">
            <?if ($flat["PROPS"]["PRICE_M2"]["VALUE"]){?>
            <span class="js_price"><?=$flat["PROPS"]["PRICE_M2"]["VALUE"]?></span> ₽ за м2
            <?}?>    
            </div>
        </a>
        <?}?>
    </div>
</section>
<?}?>
<section class="zhk_map" style="margin-top: 20px">
    <!-- <div class="choose_type_container">
        <div class="type_option type_option__active" data-typeclass="zhk_genplan">
            Генплан
        </div>
        <div class="type_option" data-typeclass="zhk_map_inside">
            Инфраструктура
        </div>
    </div> -->
    <div class="zhk_genplan" style="background-image: url('<?=CFile::GetPath($zhk_object["PROPS"]["GENPLAN"]["VALUE"])?>'); background-size: cover; display: none">
        <!-- <div class="genplan_point" data-pointid="1" style="margin-left: 500px; margin-top: 177px;">
            1.22.21
        </div>
        <div class="genplan_point_desc" data-pointid="1" style="margin-left: 565px; margin-top: 10px; display: none">
            Описание точки
        </div> -->
    </div>
    <div class="zhk_map_inside" style="">
        <div id="map_inside"></div>
        
    </div>
    
    <script>
        // Функция ymaps.ready() будет вызвана, когда
        // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
        ymaps.ready(init);
        function init(){
            // Создание карты.
            var myMap = new ymaps.Map("map_inside", {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                // Чтобы не определять координаты центра карты вручную,
                // воспользуйтесь инструментом Определение координат.
                center: [<?=$zhk_object["PROPS"]["YANDEX_MAP"]["VALUE"]?>],
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 15, 
                controls: []
                
            });
            
            // Добавление метки
            // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
            var myPlacemark = new ymaps.Placemark([<?=$zhk_object["PROPS"]["YANDEX_MAP"]["VALUE"]?>], {}, {
                iconLayout: 'default#image',
                iconImageHref: '/buy/images/map_point.svg', 
                iconImageSize: [100, 100], 
            });

            // После того как метка была создана, добавляем её на карту.
            myMap.geoObjects.add(myPlacemark);
            <?foreach ($zhk_object["CORPUSES"]["FIELDS"] as $key => $corpus){?>
                
                <?if (!$corpus["PROPERTY_PLACE_VALUE"]){continue;}?>
                var myPlacemark<?=$key?> = new ymaps.Placemark([<?=$corpus["PROPERTY_PLACE_VALUE"]?>], {}, {
                iconLayout: 'default#image',
                iconImageHref: '/buy/images/map_point.svg', 
                iconImageSize: [100, 100], 
                });

                // После того как метка была создана, добавляем её на карту.
                myMap.geoObjects.add(myPlacemark<?=$key?>);
            <?}?>

            // Создадим экземпляр элемента управления «поиск по карте»
            // с установленной опцией провайдера данных для поиска по организациям.
            var searchControl = new ymaps.control.SearchControl({
                options: {
                    provider: 'yandex#search',
                    noSuggestPanel: true,
                    strictBounds: true,
                }
            });
            
            var listItems = [
                new ymaps.control.ListBoxItem('Школа'),
                new ymaps.control.ListBoxItem('Детский сад'),
                new ymaps.control.ListBoxItem('Торговый центр'),
                new ymaps.control.ListBoxItem('Продукты'),
                new ymaps.control.ListBoxItem('Салон красоты'),
                new ymaps.control.ListBoxItem('Спорт'),
            ],

            myListBox = new ymaps.control.ListBox({
                data: {
                    content: 'Инфраструктура'
                },
                items: listItems
            });
            myListBox.events.add('click', function (e) {
                // Получаем ссылку на объект, по которому кликнули.
                // События элементов списка пропагируются
                // и их можно слушать на родительском элементе.
                var item = e.get('target');
                console.log(item.data._data)
                console.log(item.data._data.content)
                if (item.data._data.content != "Инфраструктура"){
                    searchControl.search(item.data._data.content);
                }
                // Клик на заголовке выпадающего списка обрабатывать не надо.
                // if (item != listBox) {
                //     myMap.setCenter(
                //         item.data.get('center'),
                //         item.data.get('zoom')
                //     );
                // }
            });

            myMap.controls.add(myListBox);
            myMap.controls.add(searchControl);
            
            // Программно выполним поиск определённых кафе в текущей
            // прямоугольной области карты.
            
        }

    </script>
</section>
<div class="send-application">
      <button class="send-application-button">
            <img src="/buy/images/send-application-image.svg" alt="Картинка отправки заявки" class="send-application-image">
      </button>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.7.2/nouislider.min.js" integrity="sha512-UOJe4paV6hYWBnS0c9GnIRH8PLm2nFK22uhfAvsTIqd3uwnWsVri1OPn5fJYdLtGY3wB11LGHJ4yPU1WFJeBYQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="/buy/script.js" ></script>
<script src="/buy/js/form_modal.js" ></script>
<?
require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php');
?>