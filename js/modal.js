// 거의 완벽한 유니크 아이디 값
$.uuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
// modal 생성 함수
$.modal = (obj) => {
	const $body = $('body');
	const uuid = $.uuid();
	const eventObj = obj.eventObj || {};
	const click = eventObj.click || null;

	// 미리 정의된 모달 스타일
	let styles = { width: '100%' };
	let type = '';
	switch( obj.type ) {
		case 'alert':
			styles = {width: '260px'}
			type = 'type-alert';
			break;
		default:
			styles = _.extend(styles, ( obj.styles || {} ));
			break;
	}

	const html = `
		<div class="modal ${type}" id="modal-${uuid}">
			<div class="overlay"></div>
			<div class="modal-contents" style="width: ${styles.width}">
				${obj.template}
			</div>
		</div>
	`;

	// 공통으로 사용할 close 이벤트 자동 등록 ( .btn-close-modal )
	$(document).on(`click.close-${uuid}`, `#modal-${uuid} .btn-close-modal`, (e) => {
		const $this = $(e.currentTarget);

		$this.parents('.modal').remove();
		$(document).off(`click.close-${uuid}`);

		// modal 닫히면 custom click 이벤트 모두 해제
		if( click ) {
			_.forEach(click, (v, i) => {
				$(document).off(`click.${i}-${uuid}`);
			})
		}
	});

	// eventObj에 등록된 이벤트들 등록
	if( eventObj ) {
		// 클릭 관련 이벤트 배열 분해 후 등록
		if( click ) {
			_.forEach(click, (v, i) => {
				$(document).on(`click.${i}-${uuid}`, `#modal-${uuid} ${v.target}`, () => {
					v.handler();
				});
			})
		}
	}

	$body.append(html);
	// modal 오픈 후 callback ( append 후 동기적으로 실행되어야해서 이 콜백만 이곳에 위치 )
	if( eventObj.afterOpen ) {
		eventObj.afterOpen();
	}
}




// modal 컨트롤러 (실행 바인드)
// n개의 페이지에서 사용되는 경우만 여기다 넣자. 나머지는 페이지로 빼자.
(() => {
	$(document).on('click', '#withDrawModal', () => {

		$.modal({
			template: `
				<div class="modal-body">
		    		<div class="withdraw-modal-top">
		    			<span class="">출금신청</span>
		        		<ul class="">
		        			<li>
		        				어쩌구 어쩌구우
		        			</li>
		        			<li>
		        				modal modal
		        			</li>
		        			<li>
		        				된다 된다 길게 쓰면 된다 된다? 안된다... 조금 더 길 게에에에에
		        			</li>
		        			<li>
		        				그 아래의 줄
		        			</li>
		        		</ul>
		    		</div>
		    		<div class="withdraw-modal-bottom">
		    			<table class="form-data-table">
		    				<tbody>
		    					<tr>
		    						<th>출금포인트</th>
		    						<td>
		    							<input type="text" class="input-text input-full" />
		    						</td>
		    					</tr>
		    					<tr>
		    						<th>계좌번호</th>
		    						<td>
		    							<select name="" id="selectBank" class="select select-full has-placeholder">
		    								<option value="-1">은행선택</option>
		    								<option value="">무슨은행</option>
		    								<option value="">무슨은행</option>
		    								<option value="">무슨은행</option>
		    								<option value="">무슨은행</option>
		    							</select>
		    						</td>
		    					</tr>
		    					<tr>
		    						<th>
		    							예금주
		    						</th>
		    						<td>
		    							<input type="text" class="input-text input-full" />
		    						</td>
		    					</tr>
		    				</tbody>
		    			</table>
		    		</div>
		    	</div>
		        <div class="modal-footer">
		            <button type="button" class="btn btn-gray btn-narrow btn-close-modal">취소</button>
		        	<button type="button" class="btn btn-colored btn-narrow btn-apply-withdraw">신청하기</button>
		        </div>
			`,
			eventObj: {
				afterOpen: () => {
					console.log(1);
					const selectBank = new CustomSelect($('#selectBank'));
				},
				click: [
					{
						target: '.btn-apply-withdraw',
						handler: () => {
							alert(2);
						}
					}
				]
			}
		});


	});
})();
