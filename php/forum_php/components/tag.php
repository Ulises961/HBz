<?php


echo  " <div class='row'>";
                foreach($tags as $tag){

                    $tagName = $tag['name'];
                    $tagId= $tag['tag'];
                    echo 
                            "<div class='cols tag'>".
                               "<a href='forum.php?tag=$tagId'><span class='text-secondary font-weight-bold'># $tagName</span></a>".
                            "</div>";          
                }
                echo  "</div>";

?>